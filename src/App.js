import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import {buzzWords} from "./extras";

function App() {
    const [prompt, setPrompt] = useState('a giant butterfly');
    const [aspectRatioModifier, setAspectRatioModifier] = useState(false);
    const [heightModifier, setHeightModifier] = useState(false);
    const [widthModifier, setWidthModifier] = useState(false);
    const [chosenAspectRatio, setChosenAspectRatio] = useState('Select One');
    const [chosenVersion, setChosenVersion] = useState('3');
    const [chosenQuality, setChosenQuality] = useState('1');
    const [versionModifier, setVersionModifier] = useState(false);
    const [hdModifier, setHDModifier] = useState(false);
    const [noModifier, setNoModifier] = useState(false);
    const [stopModifier, setStopModifier] = useState(false);
    const [upscaleModifier, setUpscaleModifier] = useState(false);
    const [seedModifier, setSeedModifier] = useState(false);
    const [sameSeedModifier, setSameSeedModifier] = useState(false);
    const [stylizeModifier, setStylizeModifier] = useState(false);
    const [qualityModifier, setQualityModifier] = useState(false);
    const [videoModifier, setVideoModifier] = useState(false);
    const [useImageModifier, setUseImageModifier] = useState(false);
    const [useModifiers, setUseModifiers] = useState(false);
    const [stopPercentage, setStopPercentage] = useState(100);
    const [chosenUpscale, setChosenUpscale] = useState('Regular');
    const [image, setImage] = useState('');

    const reset = () => {
        setPrompt('');
        setAspectRatioModifier(false);
        setHeightModifier(false);
        setWidthModifier(false);
        setChosenAspectRatio('Select One');
        setChosenVersion('3');
        setChosenQuality('1');
        setVersionModifier(false);
        setHDModifier(false);
        setNoModifier(false);
        setStopModifier(false);
        setUpscaleModifier(false);
        setSeedModifier(false);
        setSameSeedModifier(false);
        setStylizeModifier(false);
        setQualityModifier(false);
        setVideoModifier(false);
        setUseImageModifier(false);
        setUseModifiers(false);
        setStopPercentage(100);
        setChosenUpscale('Regular');
    }

    const generatePrompt = async () => {
        const ar = aspectRatioModifier && chosenAspectRatio !== 'Custom' ? '--ar ' + chosenAspectRatio : '';
        const imageRef = useImageModifier && image.length ? image + ' ' : '';
        const finalPrompt = `/imagine prompt:${imageRef}${prompt} ${ar}`;
        await navigator.clipboard.writeText(finalPrompt);
        alert(`"${finalPrompt}" has been copied to your clipboard`);
    }

  return (
    <div className="container">
        <h2 className={'text-center'}>MidJourney Prompt Generator</h2>
        <p className={'text-center'}><strong>MidJourney Prompt Generator</strong> is a web app designed to assist in generating prompts for MidJourney.
            Enter your prompt and choose your modifiers. Then copy the prompt and paste it in discord to run your prompt</p>
        <hr/>
        <h3>Prompt</h3>
        <div>
            <input placeholder={'Imagine your prompt here'} value={prompt} onInput={(event) => {
                const {value} = event.target
                setPrompt(value)
            }} type={'text'}/>
            <h5>Buzz Words</h5>
            <small><i>Click to add or remove</i></small>
            <div className="scrollmenu">
                {buzzWords.map((word,index) => {
                    return (
                        <a key={index} onClick={() => {
                            if (prompt.includes(`, ${word}`)) {
                                const newPrompt2 = prompt.replace(`, ${word}`, '');
                                setPrompt(newPrompt2);
                            } else {
                                setPrompt(`${prompt}, ${word}`);
                            }
                        }}>{word}</a>
                    )
                })}
            </div>
            <input id={'useImage'} checked={useImageModifier} onChange={event => {
                const {checked} = event.target
                setUseImageModifier(checked)
            }} type={'checkbox'}/>
            <label htmlFor={'useImage'}>Use Image Reference</label>
            {useImageModifier && (
                <>
                    <input value={image} onInput={event => {
                        const {value} = event.target;
                        setImage(value);
                    }} type={'text'} placeholder={'https://example.com/example.jpg'}/>
                    <small><i>Add one or more image URLs to your prompt and it will use those images as visual inspiration</i></small>
                </>
            )}
        </div>
        <hr/>
        <input id={'useModifiers'} checked={useModifiers} onChange={event => {
            const {checked} = event.target
            setUseModifiers(checked)
        }} type={'checkbox'}/>
        <label htmlFor={'useModifiers'}>Use Modifiers</label>

        {useModifiers && (
            <>
                {/*Size Modifiers*/}
                <div>
                    <hr/>
                    <h3>Size Modifiers</h3>
                    <div>
                        {/*aspect ratio*/}
                        <div>
                            <input id={'aspectRatio'} checked={aspectRatioModifier} onChange={event => {
                                const {checked} = event.target
                                setAspectRatioModifier(checked)
                            }} type={'checkbox'}/>
                            <label htmlFor={'aspectRatio'}>Aspect Ratio</label>
                            {aspectRatioModifier && (
                                <>
                                    <select value={chosenAspectRatio} onChange={event => {
                                        const {value} = event.target
                                        setChosenAspectRatio(value)
                                    }}>
                                        <option disabled>Select One</option>
                                        <option>9:16</option>
                                        <option>16:9</option>
                                        <option>4:3</option>
                                        <option>3:4</option>
                                        <option>Custom</option>
                                    </select>
                                    {chosenAspectRatio === 'Custom' && (
                                        <input type={'text'}/>
                                    )}
                                </>
                            )}
                        </div>
                        {/*width*/}
                        <div>
                            <input id={'width'} checked={widthModifier} onChange={event => {
                                const {checked} = event.target
                                setWidthModifier(checked)
                            }} type={'checkbox'}/>
                            <label htmlFor={'width'}>Width</label>
                            {widthModifier && (
                                <input type={'number'}/>
                            )}
                        </div>
                        {/*height*/}
                        <div>
                            <input id={'height'} checked={heightModifier} onChange={event => {
                                const {checked} = event.target
                                setHeightModifier(checked)
                            }} type={'checkbox'}/>
                            <label htmlFor={'height'}>Height</label>
                            {heightModifier && (
                                <input type={'number'}/>
                            )}
                        </div>
                    </div>
                </div>
                {/*Algorithm Modifiers*/}
                <div>
                    <hr/>
                    <h3>Algorithm Modifiers</h3>
                    <div>
                        {/*version*/}
                        <div>
                            <input id={'version'} checked={versionModifier} onChange={event => {
                                const {checked} = event.target
                                setVersionModifier(checked)
                            }} type={'checkbox'}/>
                            <label htmlFor={'version'}>Version</label>
                            {versionModifier && (
                                <select value={chosenVersion} onChange={event => {
                                    const {value} = event.target
                                    setChosenVersion(value)
                                }}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            )}
                        </div>
                        {/*hd*/}
                        <div>
                            <input id={'hd'} checked={hdModifier} onChange={event => {
                                const {checked} = event.target
                                setHDModifier(checked)
                            }} type={'checkbox'}/>
                            <label htmlFor={'hd'}>High Definition</label>
                        </div>
                    </div>
                </div>
                {/*Prompt Modifiers*/}
                <div>
                    <hr/>
                    <h3>Prompt Modifiers</h3>
                    <div>
                        <input id={'no'} checked={noModifier} onChange={event => {
                            const {checked} = event.target
                            setNoModifier(checked)
                        }} type={'checkbox'}/>
                        <label htmlFor={'no'}>No</label>
                        {noModifier && (
                            <>
                                <input type={'text'} placeholder={'plants'}/>
                                <small><i>Negative prompting. Attempts to remove what you specify</i></small>
                            </>
                        )}
                    </div>
                </div>
                {/*Detail Modifiers*/}
                <div>
                    <hr/>
                    <h3>Detail Modifiers</h3>
                    <div>
                        <input id={'stop'} checked={stopModifier} onChange={event => {
                            const {checked} = event.target
                            setStopModifier(checked)
                        }} type={'checkbox'}/>
                        <label htmlFor={'stop'}>Stop</label>
                        {stopModifier && (
                            <>
                                <p>{stopPercentage}%</p>
                                <input value={stopPercentage} onChange={event => {
                                    const {value} = event.target
                                    setStopPercentage(value)
                                }} type={'range'} min={10} max={100}/>
                                <small><i>Stop the generation at an earlier percentage.</i></small>
                            </>
                        )}
                    </div>
                    <div>
                        <input id={'upscale'} checked={upscaleModifier} onChange={event => {
                            const {checked} = event.target
                            setUpscaleModifier(checked)
                        }} type={'checkbox'}/>
                        <label htmlFor={'upscale'}>Upscale Quality</label>
                        {upscaleModifier && (
                            <>
                                <select value={chosenUpscale} onChange={event => {
                                    const {value} = event.target
                                    setChosenUpscale(value)
                                }}>
                                    <option>Regular</option>
                                    <option>Light</option>
                                </select>
                                <small><i>Light results are closer to the original image with less detail added during upscale.</i></small>
                            </>
                        )}
                    </div>
                </div>
                {/*Seed Modifiers*/}
                <div>
                    <hr/>
                    <h3>Seed Modifiers</h3>
                    <div>
                        <input id={'seed'} checked={seedModifier} onChange={event => {
                            const {checked} = event.target
                            setSeedModifier(checked)
                        }} type={'checkbox'}/>
                        <label htmlFor={'seed'}>Seed</label>
                        {seedModifier && (
                            <>
                                <input min={1} type={'number'} placeholder={'29083478902374'}/>
                                <small><i>Sets the random seed (an integer), which can sometimes help keep things more steady / reproducible between generations</i></small>
                            </>
                        )}
                    </div>
                    <div>
                        <input id={'sameSeed'} checked={sameSeedModifier} onChange={event => {
                            const {checked} = event.target
                            setSameSeedModifier(checked)
                        }} type={'checkbox'}/>
                        <label htmlFor={'sameSeed'}>Same Seed</label>
                    </div>
                </div>
                {/*Stylize Modifiers*/}
                <div>
                    <hr/>
                    <h3>Stylize Modifiers</h3>
                    <div>
                        <input id={'stylize'} checked={stylizeModifier} onChange={event => {
                            const {checked} = event.target
                            setStylizeModifier(checked)
                        }} type={'checkbox'}/>
                        <label htmlFor={'stylize'}>Stylize</label>
                        {stylizeModifier && (
                            <>
                                <input min={1} type={'number'} placeholder={'2500'}/>
                                <small><i>The stylize argument sets how strong of a 'stylization' your images have, the higher you set it, the more opinionated it will be.</i></small>
                            </>
                        )}
                    </div>
                </div>
                {/*Quality Modifiers*/}
                <div>
                    <hr/>
                    <h3>Quality Modifiers</h3>
                    <div>
                        <input id={'quality'} checked={qualityModifier} onChange={event => {
                            const {checked} = event.target
                            setQualityModifier(checked)
                        }} type={'checkbox'}/>
                        <label htmlFor={'quality'}>Quality</label>
                        {qualityModifier && (
                            <>
                                <select value={chosenQuality} onChange={event => {
                                    const {value} = event.target
                                    setChosenQuality(value)
                                }}>
                                    <option>.5</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </>
                        )}
                    </div>
                </div>
                {/*Other Modifiers*/}
                <div>
                    <hr/>
                    <h3>Other</h3>
                    <div>
                        <input id={'video'} checked={videoModifier} onChange={event => {
                            const {checked} = event.target
                            setVideoModifier(checked)
                        }} type={'checkbox'}/>
                        <label htmlFor={'video'}>Save Progress Video</label>
                    </div>
                </div>
            </>
        )}
        <hr/>
        <div style={{display:'grid',gridAutoColumns: 'auto', gap:'10px'}}>
            <button onClick={generatePrompt}>Generate Prompt</button>
            <button onClick={reset} className={'button-accent'}>Reset</button>
        </div>

    </div>
  );
}

export default App;
