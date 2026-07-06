import { projects, workRows, type Project } from "../content";
import { Prompt } from "./Prompt";

function ReadmeCard({ project }: { project: Project }) {
  return (
    <div className="readme" id={project.id}>
      <h3>{project.title}</h3>
      <p className="sub">{project.sub}</p>
      <p>{project.description}</p>
      <p className="tech">{project.tech}</p>
      <div className="links">
        {project.links.map((link) =>
          link.href ? (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener" : undefined}
            >
              {link.label}
            </a>
          ) : (
            <span className="no" key={link.label}>
              {link.label}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

export function Work() {
  return (
    <section className="block" id="work">
      <Prompt command="ls -l ~/work" />
      <div className="out ls">
        <table>
          <tbody>
            {workRows.map((row) => (
              <tr key={row.name}>
                <td className="perm">{row.perm}</td>
                <td>
                  {row.href ? (
                    <a className="nm" href={row.href}>
                      {row.name}
                    </a>
                  ) : (
                    <span className="nm">{row.name}</span>
                  )}
                </td>
                <td>
                  <span className={`badge ${row.badge}`}>{row.badgeLabel}</span>
                </td>
                <td className="dom">{row.domain}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Prompt command="cat ~/work/*/README.md" />
      <div className="out">
        {projects.map((project) => (
          <ReadmeCard project={project} key={project.title} />
        ))}
      </div>
    </section>
  );
}
