const BurgerButton = ({clicked, handleClick}) => {
    
    return (
        <div onClick={handleClick} className={`icon nav-icon-5 ${clicked ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default BurgerButton