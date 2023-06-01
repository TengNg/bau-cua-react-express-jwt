const BoxWrapper = ({ children, isOpen, handleClose, displayStringStyle }) => {
    return (
        <div
            className={`w-[100%] h-[100%] bg-white bg-opacity-75 absolute z-50 ${isOpen ? displayStringStyle : 'hidden'}`}
            onClick={(e) => handleClose(e)}
            onContextMenu={() => false}
        >
            {children}
        </div>
    )
}

export default BoxWrapper
