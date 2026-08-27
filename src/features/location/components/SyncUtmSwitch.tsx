import { Switch } from "@/components/ui/switch";

interface Props {
    tagId: string;
    enabled: boolean;
    setEnabled: (value: boolean) => void;
}

export function SyncUtmSwitch({ tagId, enabled, setEnabled }: Props) {
    return (
        <Switch
            id={tagId}
            checked={enabled}
            onCheckedChange={setEnabled}
        />
    );
}