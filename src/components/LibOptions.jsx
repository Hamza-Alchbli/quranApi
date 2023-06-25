import useAllLang from "./hooks/useAllLang";
import PropTypes from "prop-types";

const LibOptions = ({
    setReciter,
    setLang,
    currentSurah,
    generateSurahAudioURL,
}) => {
    const allLang = useAllLang();


    const handleReciterChange = (event) => {
        setReciter(event.target.value);
        generateSurahAudioURL(currentSurah.id - 1, event.target.value);
    };

    const handleLangChange = (event) => {
        setLang(event.target.value);
    };
    return (
        <>
            <select onChange={handleReciterChange}>
                <option value="mishari_al_afasy" disabled hidden>
                    Choose Reciter || اختيار القارئ
                </option>
                <option value="mishari_al_afasy">
                    Mishary rashid alafasy || مشاري بن راشد العفاسي
                </option>
                <option value="abdul_baset">
                    Abdul Basit Abdul Samad || عبد الباسط عبد الصمد
                </option>
                <option value="siddiq_minshawi">
                    Mohamed Siddiq El-Minshawi || محمد صديق المنشاوي
                </option>
                <option value="khalil_al_husary">
                    Mahmoud Khalil Al-Hussary || محمود خليل الحصري
                </option>
            </select>
            {allLang ? (
                <select onChange={handleLangChange}>
                    {allLang.map((lang, index) => {
                        return (
                            <option
                                key={lang.iso_code + index}
                                value={lang.iso_code}
                            >
                                {lang.name}{" "}
                                {lang.native_name == ""
                                    ? lang.native_name
                                    : `|| ${lang.native_name}`}
                            </option>
                        );
                    })}
                </select>
            ) : (
                ""
            )}
        </>
    );
};

LibOptions.propTypes = {
    setReciter: PropTypes.func.isRequired,
    setLang: PropTypes.func.isRequired,
    generateSurahAudioURL: PropTypes.func.isRequired,
    currentSurah: PropTypes.object.isRequired,
}
export default LibOptions;
