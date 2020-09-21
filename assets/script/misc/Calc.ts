// cc 종속성 라이브러리는 테스트 불가능

export function GetLocalPositionFromWorldSpace(worldNode: cc.Node, localNode: cc.Node): cc.Vec2 {
  let pos = worldNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
  return localNode.convertToNodeSpaceAR(pos);
}

export function GetPositionInMaxRadius(pos: cc.Vec2, maxRadius: number): cc.Vec2 {
  let dis = pos.sub(cc.Vec2.ZERO).mag();
  if (dis > maxRadius) {
    // 방향 벡터 계산
    let dir = cc.Vec2.ZERO.sub(pos);
    dir = dir.normalize();
    // 현재 위치에 넘어간 길이 만큼 계산
    let range = dis - maxRadius;
    dir = dir.mul(range);
    pos = pos.add(dir);
  }
  return pos;
}
