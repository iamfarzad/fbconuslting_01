import React from 'react';
import LiteraturePage from '@/components/resources/literature/literature-page';
import PageHeader from '@/components/PageHeader';

const LiteratureHomePage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="AI Literature Explorer"
        subtitle="Browse curated research papers, articles, and case studies across various AI domains."
      />
      <LiteraturePage />
    </div>
  );
};

export default LiteratureHomePage;
