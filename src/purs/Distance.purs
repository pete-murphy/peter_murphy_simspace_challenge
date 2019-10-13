module Distance where

import Prelude
import Data.Array.Partial (init)
import Data.Foldable (minimum)
import Data.Maybe (Maybe(..))
import Data.String.CodeUnits (toCharArray)
import Data.Traversable (sequence)
import Partial.Unsafe (unsafePartial)

levenshtein ::
  Int ->
  String ->
  String ->
  Maybe Int
levenshtein max' s1 s2 = unsafePartial $ levenshtein' max' 0 (toCharArray s1) (toCharArray s2)

-- | Calculates the Levenshtein distance but bails out if it exceeds max'
levenshtein' ::
  Partial =>
  Int ->
  Int ->
  Array Char ->
  Array Char ->
  Maybe Int
levenshtein' _ n [] ys = Just n

levenshtein' _ n xs [] = Just n

levenshtein' max' n xs' ys'
  | n > max' = Nothing
  | otherwise =
    join
      $ minimum
      <$> sequence
          [ levenshtein' max' (n + 1) (init xs') ys'
          , levenshtein' max' (n + 1) xs' (init ys')
          , levenshtein' max' (n + 1) (init xs') (init ys')
          ]
