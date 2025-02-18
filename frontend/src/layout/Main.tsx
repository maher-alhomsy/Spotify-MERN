import { Outlet } from 'react-router';

import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import LeftSidebar from '@/components/LeftSidebar';

const Main = () => {
  const isMobile = false;

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 flex h-full overflow-hidden p-2"
      >
        <ResizablePanel
          maxSize={30}
          defaultSize={20}
          minSize={isMobile ? 0 : 10}
        >
          <LeftSidebar />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        <ResizablePanel
          minSize={0}
          maxSize={25}
          defaultSize={20}
          collapsedSize={0}
        >
          Right side bar
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Main;
