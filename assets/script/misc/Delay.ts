const ccTimeout = (node, milsec) => {
    return new Promise((resolve, reject) => {
        setTimeout(h => {
            if (node.isValid) {
                resolve();
            } else {
                reject('node is invalid.');
            }
        }, milsec);
    });
};
  
export async function ccDelay(node: cc.Node, milsec: number): Promise<{}> {
    return await ccTimeout(node, milsec);
}
  