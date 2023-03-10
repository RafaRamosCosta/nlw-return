import { CloseButton } from "../CloseButton";

import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

/*
Cria-se um objeto para os tipos de feedback, o objeto faz com que o código não fique
engessado o código se adapta as mudaças do objeto feedbackTypes
*/
export const feedbackTypes = {
    BUG: {
        title:'Problema',
        image: {
            source: bugImageUrl,
            alt:'Imagem de um inseto',
        }
    },
    IDEA: {
        title:'Ideia',
        image: {
            source: ideaImageUrl,
            alt:'Imagem de uma lâmpada',
        }
    },
    OTHER: {
        title:'Outro',
        image: {
            source: thoughtImageUrl,
            alt:'Imagem de um balão de pensamento',
        }
    },
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false);

    function handleRestartFeedback() {
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    return(
        /*relative indica que a posição do formulário será relativa aos elementos ao redor dele
        flex indica que o display será o flex-box e o flex-col indica que os elementos serão organizados em colunas
        */
       //py padding top e bottom
       //  Object.entries(feedbackTypes) -> [['BUG', {...}], ['IDEA', {...}], ['THOUGTH', {...}]]
        <div className="bg-zinc-908 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            { feedbackSent ? (
                <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
            ) : (
                <>
                {!feedbackType ? (
                    <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                ) : (
                    <FeedbackContentStep 
                    feedbackType={feedbackType}
                    onFeedbackRestartRequested={handleRestartFeedback}
                    onFeedbackSent={() => setFeedbackSent(true)}
                    />
            )
            }
                </>
            ) }
            

            <footer className="text-xs text-neutral-400">
                Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com.br">Rocketseat</a>
            </footer>
        </div>
    )
}