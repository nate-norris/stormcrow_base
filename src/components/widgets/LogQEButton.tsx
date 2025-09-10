export default function LogQEButton() {

    function handleChange() {
        alert("clicked")
    }

    return (
        <>
            <label htmlFor="logqe">OVERWRITING</label>
            <button className="bg-amber-400" id="logqe" onClick={handleChange}>Log QE
            </button>
        </>
    );
}