// define the props
type NewProps = {
    onBack: () => void;
    onSubmit: () => void;
};

export default function NewView({ onBack, onSubmit }: NewProps) {
    return (
        <div>
            <div>New</div>
            <button className="btn" onClick={onBack}>Back</button>
            <button className="btn" onClick={onSubmit}>Submit</button>
        </div>
        
    );
}