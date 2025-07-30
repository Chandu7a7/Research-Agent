export function formatCitation(paper, style = 'APA') {
  const { title, authors, year, journal, doi, url } = paper;
  const authorList = authors ? authors.join(', ') : 'Unknown Author';
  
  switch (style.toUpperCase()) {
    case 'APA':
      return `${authorList} (${year}). ${title}. ${journal}. ${doi ? `https://doi.org/${doi}` : url}`;
    
    case 'MLA':
      return `${authorList}. "${title}" ${journal}, ${year}, ${doi ? `doi:${doi}` : url}.`;
    
    case 'CHICAGO':
      return `${authorList}. "${title}" ${journal} (${year}). ${doi ? `https://doi.org/${doi}` : url}.`;
    
    case 'IEEE':
      return `${authorList}, "${title}," ${journal}, ${year}. [Online]. Available: ${doi ? `https://doi.org/${doi}` : url}`;
    
    case 'VANCOUVER':
      return `${authorList}. ${title}. ${journal}. ${year}. Available from: ${doi ? `https://doi.org/${doi}` : url}`;
    
    case 'HARVARD':
      return `${authorList} ${year}, '${title}', ${journal}. Available at: ${doi ? `https://doi.org/${doi}` : url}`;
    
    default:
      return formatCitation(paper, 'APA');
  }
}

export function exportCitations(citations, format = 'text') {
  switch (format.toLowerCase()) {
    case 'bibtex':
      return citations.map((citation, index) => {
        return `@article{ref${index + 1},
  title={${citation.title}},
  author={${citation.authors?.join(' and ') || 'Unknown'}},
  journal={${citation.journal}},
  year={${citation.year}},
  doi={${citation.doi || ''}}
}`;
      }).join('\n\n');
    
    case 'json':
      return JSON.stringify(citations, null, 2);
    
    default:
      return citations.join('\n\n');
  }
}