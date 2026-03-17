# chadcn/ui

아름답게 디자인된 컴포넌트. 잊을 수 없는 인터랙션.

[shadcn/ui](https://ui.shadcn.com)의 드롭인 대체 라이브러리입니다. 같은 컴포넌트, 같은 API, 다른 경험.

## 왜 chadcn/ui인가

어디서나 똑같은 웹사이트. chadcn/ui는 컴포넌트에 개성을 부여합니다. shadcn/ui와 겉보기엔 동일하지만, 이용자가 진짜 기억할 인터랙션을 제공합니다.

## 컴포넌트

| 컴포넌트 | 설명 |
|---------|------|
| **Button** | 커서를 피해 도망갑니다. 7번 시도하면 항복하고, 이후 3단계 확인 다이얼로그가 나타납니다. |
| **Input** | 입력한 글자가 랜덤한 문자로 대체됩니다. `type="password"`일 때는 평문이 노출됩니다. |
| **Select** | 옵션이 열릴 때마다 섞입니다. 15% 확률로 다른 항목이 선택됩니다. 1.5초 후 자동으로 닫힙니다. |
| **Checkbox** | 뷰포트 밖으로 스크롤하면 자동으로 체크됩니다. 한 번 체크되면 해제할 수 없습니다. |
| RadioGroup | shadcn/ui 원본 동작 |
| Slider | shadcn/ui 원본 동작 |
| Switch | shadcn/ui 원본 동작 |
| Textarea | shadcn/ui 원본 동작 |
| Tooltip | shadcn/ui 원본 동작 |

## 설치

```bash
npm install @chadcn/ui
```

## 사용법

```tsx
import { Button, Input } from "@chadcn/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@chadcn/ui"
```

기존 shadcn/ui 코드에서 import 경로만 바꾸면 됩니다.

## 개발

```bash
pnpm install
pnpm dev        # 문서 사이트: http://localhost:4000
```

## 라이선스

MIT
