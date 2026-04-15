// define the props
type ContinueProps = {
    onBack: () => void;
};

export default function ContinueView({ onBack }: ContinueProps) {
    return (
        <div>
            <div>Continue</div>
            <button className="btn" onClick={onBack}>Back</button>
        </div>
    );
}