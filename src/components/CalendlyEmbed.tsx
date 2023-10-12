export const CalendlyEmbed = () => {
  return (
    <div className="calendly-embed">
      <iframe
        src="https://calendly.com/jossic-lapierre/30min"
        width="100%"
        height="600">
      </iframe>
      <style jsx>{`
        .calendly-embed {
          min-width: 320px;
          height: 630px;
        }
      `}</style>
    </div>
  );
}
