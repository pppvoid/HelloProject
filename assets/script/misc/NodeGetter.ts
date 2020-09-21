const {ccclass, property} = cc._decorator;

@ccclass
export default class NodeGetter extends cc.Component {
    static nodes = new Map<string, cc.Node>();

    onLoad () {
        NodeGetter.nodes.set(this.node.name, this.node);
    }

    static clear() {
        this.nodes.clear();
    }

    static get<T extends cc.Component>(name: string, comType?: { prototype: T }): cc.Node | T {
        if (comType) {
            let component = NodeGetter.nodes.get(name).getComponent(comType);
            if(component) {
                return component;
            }
        }     
        return NodeGetter.nodes.get(name);
    }
}
