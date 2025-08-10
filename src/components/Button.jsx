const Button = ({ content, style, onClick, className }) => {
    return (
        <button className = {className} onClick = {onClick} style = {style}> {content} </button>
    );
};

export default Button;