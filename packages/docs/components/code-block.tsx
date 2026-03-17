import { codeToHtml } from "shiki"

import { CopyButton } from "./copy-button"

export async function CodeBlock({
  code,
  lang = "tsx",
  title,
}: {
  code: string
  lang?: string
  title?: string
}) {
  const html = await codeToHtml(code.trim(), {
    lang,
    themes: {
      light: "github-light-default",
      dark: "github-dark",
    },
  })

  return (
    <figure data-rehype-pretty-code-figure="">
      {title && <figcaption data-rehype-pretty-code-title="">{title}</figcaption>}
      <div className="relative">
        <CopyButton value={code.trim()} />
        <div
          className="overflow-x-auto p-4 [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_code]:!bg-transparent [&_span]:text-[var(--shiki-light)] dark:[&_span]:!text-[var(--shiki-dark)]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </figure>
  )
}
