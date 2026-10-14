import { useState } from 'react';
import { Button } from '../../design-system/atoms/Button';
import { DynamicForm } from '../../design-system/form/DynamicForm';
import type { FormValues } from '../../design-system/form/types';
import { leadFormConfig } from './leadFormConfig';
import { validateForm } from './validation';
import styles from './LeadCapturePage.module.css';

export function LeadCapturePage() {
  const [submittedLead, setSubmittedLead] = useState<FormValues | null>(null);

  function handleSubmit(values: FormValues) {
    console.log('Lead submitted:', values);
    setSubmittedLead(values);
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Capture a lead</h1>
        <p className={styles.subtitle}>Fields marked * are required.</p>
      </header>

      <section className={styles.card}>
        {submittedLead ? (
          <div>
            <h2 className={styles.resultTitle}>Lead saved</h2>
            <pre className={styles.result}>{JSON.stringify(submittedLead, null, 2)}</pre>
            <Button variant="secondary" onClick={() => setSubmittedLead(null)}>
              Add another lead
            </Button>
          </div>
        ) : (
          <DynamicForm
            config={leadFormConfig}
            validate={validateForm}
            submitLabel="Save lead"
            onSubmit={handleSubmit}
          />
        )}
      </section>
    </main>
  );
}
