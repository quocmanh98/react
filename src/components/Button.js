const Button = ({ color, text, onClick }) => {
    return <button onClick={onClick} style={{ backgroundColor: color }} className="btn text-black" >{text}</button>
}

export default Button