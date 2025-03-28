export default function Die (props) {

    let styles = {
        backgroundColor: props.isHeld  ? "green" : "white"
    }
    
    return (
        <button style={styles} onClick={props.hold}>{props.value}</button>
    )
}