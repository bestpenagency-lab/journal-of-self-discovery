export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="footer-logo">Mind Shift Lab</p>
          <p className="footer-tagline">Brain Rewiring Systems</p>
        </div>
        <div className="footer-links">
          <a
            href="https://mindshiftlabconsulting.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            mindshiftlabconsulting.com
          </a>
          <a
            href="https://instagram.com/lucia_giammarco_granier_"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            @lucia_giammarco_granier_
          </a>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} Lucia Giammarco Granier · Mind Shift Lab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
