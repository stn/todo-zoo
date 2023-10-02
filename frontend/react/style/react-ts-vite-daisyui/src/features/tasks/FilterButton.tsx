import React, { useMemo } from "react"

interface FilterButtonProps {
  name: string
  isPressed: boolean
  setFilter: (name: string) => void
}

function FilterButton({ name, isPressed, setFilter }: FilterButtonProps) {
  return (
    <button
      className={isPressed ? "tab tab-active" : "tab"}
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span className="hidden">Show </span>
      <span>{name}</span>
      <span className="hidden"> tasks</span>
    </button>
  )
}

export default FilterButton
