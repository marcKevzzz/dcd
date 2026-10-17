export function Cursor() {
  return (
    <div className="cursor" aria-hidden="true">
      <span className="cursor__h" />
      <span className="cursor__v" />
      <span className="cursor__pt">
        <span className="cursor__ring" />
        <span className="cursor__label mono" />
      </span>
    </div>
  )
}
