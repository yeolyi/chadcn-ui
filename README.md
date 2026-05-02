# chadcn/ui

잘못된 클릭을 줄이는 React 컴포넌트 라이브러리.

<p align="center">
  <img src="./packages/docs/public/logo.png" alt="chadcn/ui" width="160" />
</p>

shadcn/ui와 똑같이 생긴 컴포넌트지만, 사용자가 한 번 더 생각하고 누르도록 돕습니다.

## 문서

[chad-cn.com](https://chad-cn.com)

## 설치

```bash
pnpm add @chadcn/ui
```

```tsx
import { Button } from "@chadcn/ui/button/escape"

export function Example() {
  return <Button>제출</Button>
}
```

variant마다 동작이 다르니 import 경로로 원하는 동작을 선택하세요. 사용 가능한 variant는 [문서](https://chad-cn.com/docs/components/button)에서 확인할 수 있습니다.

## 라이선스

MIT
