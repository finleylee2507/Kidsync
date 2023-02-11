# YourTurn Developer Rules and Documentation

## Coding Style Rules

1. Always use arrow functions.

```
const ComponentName = ( {Component Parameters} ) => {
    // Code goes here
}

export default ComponentName
```

2. Use Prettier extension to allow for consistent indentation, and fewer merge conflicts due to style.
3. Use let instead of var when applicable.
4. Use CSS modules
   1. Name the file "ComponentName.module.css" rather than "ComponentName.css"
   2. In the CSS file, use camelcase notation (no hyphens, etc.)
   ```
   exampleStyle = {
       margin-top: 0px;
   }
   ```
   3. In the component file, import CSS module file as follows:
   ```
   import styles from "ComponentName.modules.css"
   ```
   4. Use styling as follows
   ```
   <div className={styles.exampleStyle}>
   ...
   </div>
   ```
5. Add concise code comments as you are coding, for better understanding of the code

   ```
   // Function that does ...
   const exampleFunction = (param1, param2) => {
       ...
   }

   ```

6. If function requires more explanation, explain it in detail in the Documentation.md.

```
// See Documentation.md for detailed description
   const exampleFunction = (param1, param2) => {
       ...
   }
```

## Branching and Merge Rules

1. Always work on new features using a feature branch
2. Branch off of main only.
3. Every feature branch should only include features specific to it. If there are additional features needed, branch off of your feature branch.

```
main -> feature
This feature branch should only contain code specific to that feature

If additional functionality is needed
feature -> featureAdditional
All additional features go in the featureAdditionalBranch

Merge featureAdditional back into feature (can be done on your own)
Merge feature into main
```

4. Never merge to main on your own.
5. Main branch should ONLY contain fully functional, demo-ready code.

## Merge Day

THURSDAYS will be days where we merge all feature branches into main.
