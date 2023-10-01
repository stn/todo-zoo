import React from "react"

interface FilterButtonProps {
  name: string
  isPressed: boolean
  setFilter: (name: string) => void
}

function FilterButton({ name, isPressed, setFilter }: FilterButtonProps) {
  return (
    <button
      type="button"
      className="py-2 mx-2 border-2 rounded basis-1/3"
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
