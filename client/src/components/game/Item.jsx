export default function Item({
    id,
    name,
    betLevel,
    selected,
    canSelect,
    handleSelectItem,
    handleOpenItemBetLevelSelection,
    setCurrentItemId
}) {
    const select = (e) => {
        if (e.currentTarget !== e.target) return;
        setCurrentItemId(id);
        handleSelectItem(id);
    }

    const openBetLevelSelection = (e) => {
        setCurrentItemId(id);
        handleOpenItemBetLevelSelection(e);
    }

    return (
        <>
            <div
                className={`relative w-[100px] h-[100px] border-black border-[4px] grid place-items-center select-none cursor-pointer font-bold ${selected ? 'bg-gray-400 text-white' : 'bg-[whitesmoke]'}`}
                onClick={(e) => select(e)}
                onContextMenu={(e) => openBetLevelSelection(e)}
            >
                {name}
                {canSelect && (
                    <p className='absolute font-bold right-[0.25rem] top-0 m-0 p-0'>{betLevel === 1 ? '' : 'x' + betLevel}</p>
                )}
            </div>
        </>
    )
}
