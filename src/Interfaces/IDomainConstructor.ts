interface IDomainConstructor<T, R> {
  new(obj: T): R
}

export default IDomainConstructor;