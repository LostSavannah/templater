import { useTemplates } from "../hooks/useTemplates"
import EmbeddedContent from "../components/EmbeddedContent";
import TemplatesList from "../components/TemplatesList";
import RenderizerSelector from "../components/RenderizerSelector";
import ParserSelector from "../components/ParserSelector";
import DataEditor from "../components/DataEditor";
import RunButton from "../components/RunButton";
import { DirectoryEvents } from "../components/DirectoryView";
import { Modal, ModalMethods } from "../components/Modal";
import { useRef } from "react";

export default function MainLayout() {
    const { 
        setCurrentParser, 
        setCurrentRenderizer, 
        setCurrentTemplate, 
        setCurrentData, 
        parse,
        canParse,
        currentParser,
        currentRenderizer,
        currentTemplate,
        currentData,
        currentResult} = useTemplates();

        const ref = useRef<ModalMethods>(null);

        function handleOnParse(){
            parse();
        }
        const events:DirectoryEvents = {
            onSelect: (template: string) => {
                setCurrentTemplate(template);
                ref.current?.showDialog();
            },
            onDelete: (template: string) => {
                alert(template);
            },
            OnUpdate: (template: string) => {
                alert(template);
            },
        }
  return (<>
    <div className="w-100 h4 bg-dark p-3 text-light">
        <span className="p-3">Templater</span>
    </div>
    <div className="container vw-100 vh-100">
    <div className="row h-100">
        <div className="col-4 h-100 bg-success">
            <div className="d-flex flex-column h-100">
            <TemplatesList value={currentTemplate} events={events}/>
            <DataEditor value={currentData} onChange={setCurrentData}/>
            <ParserSelector value={currentParser} onChange={setCurrentParser}/>
            <RenderizerSelector value={currentRenderizer} onChange={setCurrentRenderizer}/>
            {canParse && <RunButton onClick={handleOnParse}/>}
            </div>
        </div>
        <div className="col-8 bg-success">
        {currentResult && <EmbeddedContent content={currentResult!}/>}
        </div>
    </div>
    </div>
    <Modal ref={ref} hidden={true} actions={[]} title="Edit">
        <a></a>
    </Modal>
  </>
  )
}
