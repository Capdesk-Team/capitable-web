// Hooks API
import { useState } from "react";
// Material UI
import {
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Paper,
} from "@mui/material";
// Import Style
import { makeStyles, Theme } from "@material-ui/core/styles"
// Components
import Header from "components/layouts/Header"
import Footer from "components/layouts/Footer"
import JobPosition from "./forms/JobPosition";
import JobContent from "./forms/JobContent";
import RecruitPerson from "./forms/RecruitPerson";
import Employment from "./forms/Employment";
import JobFormConfirm from "./JobFormConfirm";

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: '100%',
    minHeight: '100vh',
    position: 'relative',
    paddingBottom: 120,
    boxSizing: "border-box",
  },
  container: {
    marginTop: "1.5rem",
    marginBottom: "6rem"
  },
}))

// Form Steps
const steps = ['募集ポジション', '業務情報', '求める人物像', '雇用情報', '入力内容を確認'];

export default function CompanyRegister() {
  const classes = useStyles()

  const [activeStep, setActiveStep] = useState(0);
  const [formValue, setFormValue] = useState({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const changeFormComponent = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return (
          <JobPosition
            handleNext={handleNext}
            formValue={formValue}
            setFormValue={setFormValue}
          />
        );
      case 1:
        return (
          <JobContent
            handleBack={handleBack}
            handleNext={handleNext}
            formValue={formValue}
            setFormValue={setFormValue}
          />
        );
      case 2:
        return (
          <RecruitPerson
            handleBack={handleBack}
            handleNext={handleNext}
            formValue={formValue}
            setFormValue={setFormValue}
          />
        );
      case 3:
        return (
          <Employment
            handleBack={handleBack}
            handleNext={handleNext}
            formValue={formValue}
            setFormValue={setFormValue}
          />
        );
      case 4:
        return (
          <JobFormConfirm
            handleBack={handleBack}
            handleNext={handleNext}
            formValue={formValue}
            setFormValue={setFormValue}
          />
        );
    }
  };
  
  return (
    <div className={classes.wrapper}>
      <header>
        <Header/>
      </header>
      <Container className={classes.container}>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h3" variant="h5" align="center" gutterBottom>
              募集内容を登録
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <div>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  募集作成が完了しました。応募があった場合、募集作成者のメールアドレスに通知されます。
                </Typography>
              </div>
            ) : (
              <div>
                {changeFormComponent(activeStep)}
              </div>
            )}
          </Paper>
        </Container>
      </Container>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}
