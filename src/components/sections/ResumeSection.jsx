import React, { useEffect, useState } from 'react';

const ResumeSection = () => {
  const [resumeData, setResumeData] = useState(null);
  const [titleData, setTitleData] = useState(null);

  useEffect(() => {
    fetch('/data/sections/resume.json')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.locales && data.locales.en && data.title?.locales?.en) {
          setResumeData(data.locales.en);
          setTitleData(data.title.locales.en);
        }
      })
      .catch((error) => {
        console.error('Error loading resume.json:', error);
      });
  }, []);

  if (!resumeData || !titleData) return <p>Loading...</p>;

  const fullTitle = `${titleData.title_long_prefix} ${titleData.title_long.replace('{{Resume}}', titleData.title_short)}`;

  return (
    <section className="resume-section" style={{ padding: '2rem' }}>
      <h2>{fullTitle}</h2>
      <p>{resumeData.description}</p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        {resumeData.actions.map((action, index) => (
          <a
            key={index}
            href={action.link}
            target="_blank"
            rel="noopener noreferrer"
            download={action.type === 'download'}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: 'bold'
            }}
          >
            {action.label}
          </a>
        ))}
      </div>

      <iframe
        src={resumeData.pdfUrl}
        width="100%"
        height="700px"
        title="Resume PDF"
        style={{ border: '1px solid #ccc' }}
      />
    </section>
  );
};

export default ResumeSection;
