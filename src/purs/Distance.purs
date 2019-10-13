module Distance where

import Prelude
import Control.Monad.ST (ST)
import Control.Monad.ST as ST
import Control.Monad.ST.Ref as STRef
import Data.Array (reverse, sortBy, unsafeIndex)
import Data.Array as Array
import Data.Array.ST (STArray)
import Data.Array.ST as STArray
import Data.Maybe (Maybe(..))
import Data.String (length)
import Data.String.CodeUnits (toCharArray)
import Partial.Unsafe (unsafePartial)

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
levenshtein "" b = length b

levenshtein a "" = length a

levenshtein a b
  | a == b = 0
  | otherwise =
    unsafePartial
      $ ST.run do
          let
            [ as, bs ] = reverse $ toCharArray <$> sortBy (comparing length) [ a, b ]
          row <- STArray.empty
          prev <- STRef.new 0
          val <- STRef.new 0
          ST.for 0 (Array.length as + 1) $ \i -> STArray.push i row
          ST.for 1 (Array.length bs + 1)
            $ \i -> do
                _ <- STRef.write (i - 1) prev
                _ <-
                  ST.for 1 (Array.length as + 1) \j -> do
                    prev' <- STRef.read prev
                    _ <-
                      if (bs !!! i - 1 == as !!! j - 1) then do
                        j1 <- unsafePeek (j - 1) row
                        STRef.write j1 val
                      else do
                        j1 <- unsafePeek (j - 1) row
                        j2 <- unsafePeek j row
                        STRef.write (min (j1 + 1) (min (prev' + 1) (j2 + 1))) val
                    _ <- STArray.modify (j - 1) (\_ -> prev') row
                    val' <- STRef.read val
                    STRef.write val' prev
                prev' <- STRef.read prev
                STArray.modify (Array.length as) (\_ -> prev') row
          unsafePeek (Array.length as) row
