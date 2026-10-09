import * as React from "react"
import Icon from "../../ui/Icon"
import { Field, Hidden, Success, same } from "../../forms/Fields"
import { JOBS, LOCATIONS, NOTICE } from "../../../lib/content/careers"

const opts = (list: string[]) => same(list).map(([v, t]) => <option key={v} value={v}>{t}</option>)

/** Job application form (form id "careers-application", with CV upload). With `role` set (a job page) the role is a
 *  hidden field; without it (open application) the candidate picks a position. `loc` is listed first. */
const JobForm: React.FC<{ fid: string; role: string | null; loc: string }> = ({ fid, role, loc }) => {
  const locs = [loc, ...LOCATIONS.filter(l => l !== loc)]
  return (
    <section className="jf" aria-labelledby={`${fid}-h`}>
      <h3 id={`${fid}-h`} className="jf__title">Job application</h3><p className="jf__sub">Apply for this position</p>
      <form className="form js-form jf__form" id={fid} name="careers-application" method="POST" encType="multipart/form-data" data-success={`${fid}-ok`} data-title="Job application">
        <Hidden name="careers-application" />
        {role
          ? <input type="hidden" name="role" value={role} />
          : <div className="field"><label htmlFor="f-role">Position *</label><select id="f-role" name="role" required><option value="">Select position</option>{opts([...JOBS.map(j => j.title), "Open application"])}</select><div className="err" role="alert"></div></div>}
        <div className="form__row"><Field label="Full Name" name="name" required autoComplete="name" placeholder="Enter full name" /><Field label="Email" name="email" type="email" required autoComplete="email" placeholder="name@company.com" /></div>
        <div className="form__row"><Field label="Phone" name="phone" type="tel" required autoComplete="tel" placeholder="+1 (555) 000-0000" />
          <div className="field"><label htmlFor="f-location">Location Preferred *</label><select id="f-location" name="location" required><option value="">Select location</option>{opts(locs)}</select><div className="err" role="alert"></div></div></div>
        <div className="field"><label htmlFor="f-notice">Notice Period *</label><select id="f-notice" name="notice" required><option value="">Select notice period</option>{opts(NOTICE)}</select><div className="err" role="alert"></div></div>
        <Field label="Cover Letter" name="cover" type="textarea" required placeholder="Tell us about your background, relevant experience, and why you are a strong fit for this role." />
        <div className="field"><span className="label">Upload CV/Resume</span>
          <label className="upload" htmlFor="f-cv"><span className="upload__ico" aria-hidden="true"><Icon name="upload" /></span>
            <span className="upload__text"><span className="upload__name" data-file-name="">No file selected</span><span className="upload__hint">Allowed Type(s): .pdf, .doc, .docx</span></span>
            <span className="upload__btn">Upload</span>
            <input id="f-cv" className="upload__input" type="file" name="cv" accept=".pdf,.doc,.docx" /></label><div className="err" role="alert"></div></div>
        <label className="check"><input type="checkbox" name="consent" value="yes" required /><span>By using this form you agree with the storage and handling of your data by this website. *</span></label>
        <div className="form__status" role="alert"></div>
        <div><button className="jf__submit" type="submit">Submit application</button></div>
      </form>
      <Success id={`${fid}-ok`} title="Application received" message="Thank you for applying. Our talent team reviews every application and will be in touch if there’s a match." formId={fid} again="Submit another application" />
    </section>
  )
}
export default JobForm
