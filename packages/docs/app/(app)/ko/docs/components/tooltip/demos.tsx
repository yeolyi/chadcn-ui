"use client"

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@chadcn/ui"

export function TooltipMainDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">마우스를 올려보세요</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>라이브러리에 추가</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function TooltipSidesDemo() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">위</Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>위쪽 툴팁</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">오른쪽</Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>오른쪽 툴팁</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">아래</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>아래쪽 툴팁</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">왼쪽</Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>왼쪽 툴팁</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
