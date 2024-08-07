import { useParams } from 'react-router-dom';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PdfDocument from './components/pdf-document';
import { inspections } from '../../inspections/data/inspections';
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout';
import { Card } from "@/components/ui/card";
import { Button } from '@/components/custom/button';
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import Options from './components/options';


const GenerateReport = () => {
  const { inspectionId } = useParams();
  const inspection = inspections.find((i) => i.id === inspectionId);


  if (!inspection) {
    throw new Error('Inspection not found');
  }

  return (
    <Layout>
      <LayoutHeader>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className="space-y-4">
        <div className='flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            PDF Generator
          </h1>
          <Button>
            <PDFDownloadLink
              document={<PdfDocument inspection={inspection} />}
              fileName={`inspection-report-${inspection.id}.pdf`}
            >
              {({ loading }) =>
                loading ? 'Loading document...' : 'Download PDF'
              }
            </PDFDownloadLink>
          </Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Options />
          <Card className="space-y-2">
            <PDFViewer width="100%" height="100%" className='rounded-lg'>
              <PdfDocument inspection={inspection} />
            </PDFViewer>
          </Card>
        </div>
      </LayoutBody>
    </Layout>
  );
};

export default GenerateReport;
const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
  },
  {
    title: 'Reports',
    href: 'dashboard/report',
    isActive: false,
  },
  {
    title: 'Logs',
    href: 'dashboard/logs',
    isActive: false,
  },
  {
    title: 'Settings',
    href: '/settings',
    isActive: false,
  },
]
