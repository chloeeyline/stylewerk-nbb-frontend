/**
 * A function you can give as many arguments you want and of any type you want.
 * If an argument is not a string it will be ignored.
 * It concatenates all string arguments with a space between.
 * This way it can easily be used as a className prop.
 *
 * ```jsx
 * function Component({
 *   children,
 *   string,       // for this example "foo"
 *   booleanA,     // for this example true
 *   booleanB,     // for this example false
 *   stringOrNull, // for this example null
 *   something,    // for this example a Date-Object
 * }) {
 *   return (
 *     <div
 *       // This call to cls will result in "foo isTrue".
 *       // Any parameter passed that is not a string is dropped.
 *       // The values explicitely type checked.
 *       // No type coercion will happen.
 *       className={cls(
 *         string,
 *         booleanA ? "isTrue" : "isFalse",
 *         booleanB ? "bar" : undefined,
 *         stringOrNull,
 *         something,
 *       )}>
 *       {children}
 *     </div>
 *   );
 * }
 * ```
 *
 * @param classes
 * @returns A string that is all string arguments concatenated with a space in between.
 */
export default function cls(...classes: unknown[]) {
    // filter out anything that is not a string
    const filtered = classes.filter(
        (className): className is string => typeof className === "string" && className !== "",
    );

    return filtered.join(" ");
}
