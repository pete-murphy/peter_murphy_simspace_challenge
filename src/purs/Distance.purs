module Distance where

import Prelude
import Control.Monad.ST (ST)
import Control.Monad.ST as ST
import Control.Monad.ST.Ref as STRef
import Data.Array (sortBy, unsafeIndex)
import Data.Array.ST (STArray)
import Data.Array.ST as STArray
import Data.Char (toCharCode)
import Data.Maybe (Maybe(..))
import Data.Ord (abs)
import Data.String (length)
import Data.String.CodeUnits (toCharArray)
import Partial.Unsafe (unsafePartial)

min' ::
  Int ->
  Int ->
  Int ->
  Int ->
  Int ->
  Int
min' d0 d1 d2 bx ay
  | d0 < d1 || d2 < d1 = if d0 > d2 then d2 + 1 else d0 + 1
  | bx == ay = d1
  | otherwise = d1 + 1

infixr 5 unsafeIndex as !!!

mapmapmap ::
  forall f g h a b.
  Functor f =>
  Functor g =>
  Functor h =>
  (a -> b) ->
  f (g (h a)) ->
  f (g (h b))
mapmapmap = (<$>) <<< (<$>) <<< (<$>)

infix 2 mapmapmap as <$$$>

unsafePeek ::
  forall h a.
  Int ->
  STArray h a ->
  ST h a
unsafePeek = (unsafePartial <<< case _ of Just x -> x) <$$$> STArray.peek

levenshtein ::
  String ->
  String ->
  Int
levenshtein a b
  | a == b = 0
  | otherwise =
    abs $ unsafePartial
      $ ST.run do
          let
            [ as, bs ] = toCharArray <$> sortBy (comparing length) [ a, b ]
          la <- STRef.new (length a)
          lb <- STRef.new (length b)
          ST.while do
            la' <- STRef.read la
            lb' <- STRef.read lb
            pure $ la' > 0 && as !!! (la' - 1) == bs !!! (lb' - 1)
            $ STRef.modify (_ - 1) la
            *> STRef.modify (_ - 1) lb
          offset <- STRef.new 0
          ST.while do
            la' <- STRef.read la
            offset' <- STRef.read offset
            pure $ offset' < la' && as !!! offset' == bs !!! offset'
            $ STRef.modify (_ + 1) offset
          offset' <- STRef.read offset
          _ <- STRef.modify (_ - offset') la
          _ <- STRef.modify (_ - offset') lb
          la' <- STRef.read la
          lb' <- STRef.read lb
          unless (la' == 0 || lb' < 3) do -- Could be a problem setting these all to zero
            x <- STRef.new 0
            y <- STRef.new 0
            d0 <- STRef.new 0
            d1 <- STRef.new 0
            d2 <- STRef.new 0
            d3 <- STRef.new 0
            dd <- STRef.new 0
            dy <- STRef.new 0
            ay <- STRef.new 0
            bx0 <- STRef.new 0
            bx1 <- STRef.new 0
            bx2 <- STRef.new 0
            bx3 <- STRef.new 0
            v <- STArray.empty
            ST.for 0 la'
              $ \i -> do
                  _ <- STArray.push (i + 1) v
                  _ <- STArray.push (toCharCode $ as !!! (offset' + i)) v
                  pure unit
            len <- STRef.new (la' * 2 - 1) -- This might fail??
            ST.while do
              x' <- STRef.read x
              pure $ x' < lb' - 3
              $ do
                  x' <- STRef.read x
                  _ <- STRef.modify (pure x') d0
                  bx0' <- STRef.modify (\_ -> toCharCode $ bs !!! (offset' + x')) bx0
                  d1' <- STRef.modify (\_ -> x' + 1) d1
                  bx1' <- STRef.modify (\_ -> toCharCode $ bs !!! (offset' + x' + 1)) bx1
                  d2' <- STRef.modify (\_ -> x' + 2) d2
                  bx2' <- STRef.modify (\_ -> toCharCode $ bs !!! (offset' + x' + 1)) bx2
                  d3' <- STRef.modify (\_ -> x' + 3) d3
                  bx3' <- STRef.modify (\_ -> toCharCode $ bs !!! (offset' + x' + 3)) bx3
                  _ <- STRef.modify (_ + 4) x
                  dd' <- STRef.modify (\_ -> x' + 4) dd
                  pure $ ST.for 0 ((la' * 2 - 1) `div` 2)
                    $ \i -> do
                        let
                          z = i * 2
                        z0 <- unsafePeek z v
                        dy' <- STRef.modify (\_ -> z0) dy
                        z1 <- unsafePeek (z + 1) v
                        ay' <- STRef.modify (\_ -> z1) ay
                        d0'' <- STRef.modify (\d -> min' dy' d d1' bx0' ay') d0
                        d1'' <- STRef.modify (\d -> min' d0'' d d2' bx1' ay') d1
                        d2'' <- STRef.modify (\d -> min' d1'' d d3' bx2' ay') d2
                        dd'' <- STRef.modify (\d -> min' d2'' d dd' bx3' ay') dd
                        _ <- STArray.modify z (\_ -> dd'') v
                        _ <- STRef.modify (\_ -> d2'') d3
                        _ <- STRef.modify (\_ -> d1'') d2
                        _ <- STRef.modify (\_ -> d0'') d1
                        _ <- STRef.modify (\_ -> dy') d0
                        _ <- STRef.modify (\_ -> dd'') lb
                        pure unit
            ST.while do
              x' <- STRef.read x
              pure $ x' < lb'
              $ do
                  x' <- STRef.read x
                  d0' <- STRef.modify (\_ -> x') d0
                  bx0' <- STRef.modify (\_ -> d0') bx0
                  x'' <- STRef.modify (_ + 1) x
                  dd' <- STRef.modify (\_ -> x'') dd
                  pure $ ST.for 0 ((la' * 2 - 1) `div` 2)
                    $ \i -> do
                        let
                          z = i * 2
                        z0 <- unsafePeek z v
                        dy' <- STRef.modify (\_ -> z0) dy
                        z1 <- unsafePeek (z + 1) v
                        dd'' <- STRef.modify (\d -> min' dy' d0' d bx0' z1) dd
                        _ <- STArray.modify z (\_ -> dd'') v
                        _ <- STRef.modify (\_ -> dy') d0
                        pure unit
            dd' <- STRef.read dd
            _ <- STRef.modify (\_ -> dd') lb
            pure unit
          STRef.read lb
