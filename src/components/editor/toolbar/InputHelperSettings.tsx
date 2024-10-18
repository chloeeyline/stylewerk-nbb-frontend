import { EntryCell } from "~/redux/features/editor/editor-schemas";
import { IhCheckboxSettings } from "../input-helper/IhCheckbox";
import { IhDateTimeSettings } from "../input-helper/IhDateTime";
import { IhNumberSettings } from "../input-helper/IhNumber";
import { IhStaticSettings } from "../input-helper/IhStatic";
import { IhTextLongSettings } from "../input-helper/IhTextLong";
import { IhTextShortSettings } from "../input-helper/IhTextShort";

const InputHelperSettings = ({ cell }: { cell: EntryCell | null }) => {
    if (!cell) return null;
    switch (cell.template.inputHelper) {
        case 1:
            return <IhStaticSettings cell={cell} />;
        case 2:
            return <IhTextShortSettings cell={cell} />;
        case 3:
            return <IhTextLongSettings cell={cell} />;
        case 4:
            return <IhNumberSettings cell={cell} />;
        case 5:
            return <IhCheckboxSettings cell={cell} />;
        case 6:
            return <IhDateTimeSettings cell={cell} />;
        default:
            return null;
    }
};

export default InputHelperSettings;
