// cc 종속성 라이브러리는 테스트 불가능
export class NodeUtil {
    static CopyNode(node: cc.Node | cc.Prefab, parentNode: cc.Node = null): cc.Node {
        const copyNode = cc.instantiate(node) as cc.Node;
        if (node instanceof cc.Prefab) {
            copyNode.parent = parentNode;
        } else {
            copyNode.parent = null === parentNode ? node.parent : parentNode;
        }
        return copyNode;
    }

    static CopyNodeCom<T extends cc.Component>(type: { prototype: T }, node: cc.Node | cc.Prefab, parentNode: cc.Node = null): cc.Node {
        const copyNode = cc.instantiate(node) as cc.Node;
        copyNode.addComponent(type.prototype.constructor.name);

        if (node instanceof cc.Prefab) {
            copyNode.parent = parentNode;
        } else {
            copyNode.parent = null === parentNode ? node.parent : parentNode;
        }
        return copyNode;
    }

    static Copy<T extends cc.Component>(type: { prototype: T }, obj: cc.Node | cc.Prefab | cc.Component, parentNode: cc.Node = null): T {
        let copyNode: cc.Node;
        if (obj instanceof cc.Component) {
            copyNode = NodeUtil.CopyNode(obj.node, parentNode);
        } else {
            copyNode = NodeUtil.CopyNode(obj, parentNode);
        }
        return copyNode.getComponent(type);
    }

    // 첫자식 노드를 가지고 갯수를 늘리고 줄임
    // 스펙상 런타임에 최소 갯수가 하나이상인 아이템 갯수 재조정에 쓰임
    static ResizeContents<T extends cc.Component>(content: cc.Node, newSize: number, addComType?: { prototype: T }) {
        const contentChildCount = content.children.length;
        const firstChild = content.children[0];
        if (undefined !== addComType) {
            const component = firstChild.getComponent(addComType);
            if (null === component) {
                firstChild.addComponent(addComType.prototype.constructor.name);
            }
        }

        if (contentChildCount < newSize) {
            for (let i = 0; i < newSize - contentChildCount; i++) {
                NodeUtil.CopyNode(firstChild);
            }
        } else if (contentChildCount > newSize) {
            for (let i = 0; i < contentChildCount - newSize; i++) {
                content.removeChild(content.children[0], true);
            }
        }

        if (contentChildCount !== newSize) {
            const layout = content.getComponent<cc.Layout>(cc.Layout);
            layout.updateLayout();
        }
    }

    static GetWorldPosition(node: cc.Node): cc.Vec2 {
        return node.convertToWorldSpaceAR(cc.Vec2.ZERO);
    }

    static ConvertSpace(fromNode: cc.Node, toNode: cc.Node): cc.Vec2 {
        return toNode.convertToNodeSpaceAR(fromNode.convertToWorldSpaceAR(cc.Vec2.ZERO));
    }
}
