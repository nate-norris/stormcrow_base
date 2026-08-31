export const loggingStatusAtom = atom<LoggingStatus>((get): LoggingStatus => {
    const qeForm = get(activeQEFormAtom);

    return {
        qeCount: qeForm.qeCount,
        qeType: qeForm.qeType,
    };
});