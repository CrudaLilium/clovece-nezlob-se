function* generator(): Generator<number, number, void> {
    let i = 0;
    while (true)
        yield i++;
}
const generatorFnc = generator();
function _createIdentity(): number {
    return generatorFnc.next().value;
}

export interface IIdentityGenerator {
    createIdentity(): number;
}

export const IdentityFactory: IIdentityGenerator = {
    createIdentity: _createIdentity
}