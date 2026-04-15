// define the props
type ContinueProps = {
    onBack: () => void;
    onSubmit: () => void;
};

export default function ContinueView({ onBack, onSubmit }: ContinueProps) {
    return (
        <div>
            <div>Continue</div>
            <button className="btn" onClick={onBack}>Back</button>
            <button className="btn" onClick={onSubmit}>Submit</button>
        </div>
    );
}