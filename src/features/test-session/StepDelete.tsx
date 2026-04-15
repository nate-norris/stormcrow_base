// define the props
type DeleteProps = {
    onBack: () => void;
};

export default function DeleteView({ onBack }: DeleteProps) {
    return (
        <div>
            <div>Delete</div>
            <button className="btn" onClick={onBack}>Back</button>
            <ConfirmDeleteView />
        </div>
    );
}

// confirmation to proceed with deletion of a test
function ConfirmDeleteView() {
    // TODO show warning if trying to delete current active test session
    //      do not allow delete to finalize
    return (
        <></>
    );
}