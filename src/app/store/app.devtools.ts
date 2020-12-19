export const composeWithDevtools = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

export function configureDevtools(): void {
  if (composeWithDevtools) {
    // @ts-ignore
    // eslint-disable-next-line no-extend-native
    Map.prototype.toJSON = function () {
      const obj: any = {}
      this.forEach((value, key) => (obj[key] = value))
      return obj
    }
  }
}
