{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name =
    "my-project"
, dependencies =
    [ "effect"
    , "console"
    , "psci-support"
    , "react-basic"
    , "react-basic-hooks"
    , "linear-algebra"
    , "ohyes"
    ]
, packages =
    ./packages.dhall
, sources =
    [ "src/**/*.purs", "test/**/*.purs" ]
}
