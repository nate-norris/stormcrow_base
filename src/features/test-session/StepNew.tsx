// define the props
type NewProps = {
    onBack: () => void;
};

export default function NewView({ onBack }: NewProps) {
    return (
        <div>
            <div>New</div>
            <button className="btn" onClick={onBack}>Back</button>
        </div>
        
    );
}