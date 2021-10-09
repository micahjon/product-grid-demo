import './style.css'

type ChipProps = {
  name: string,
  isSelected: boolean, 
  onSelect: (event: any) => void, 
  onDeselect: (event: any) => void, 
  className?: string,
};

function Chip({ name, isSelected, onSelect, onDeselect, className }: ChipProps) {
  const classNames = [
    'chip',
    isSelected ? 'chip--selected' : 'chip--deselected',
    className,
  ].filter(Boolean).join(' ');

  if (!isSelected) {
    // Click button to select
    return <button className={classNames} onClick={onSelect}>{name}</button>
  }

  // Click close (X) button to deselect
  return <div className={classNames}>
    {name}
    <button className="chip__x" onClick={onDeselect}>X</button>
  </div>
}

export default Chip
