// Hooks API
import { useEffect } from "react";
// Material UI
import { 
  Box, 
  Button, 
  TextField, 
  Typography 
} from "@mui/material";
// Hook Form
import { Controller, useForm } from "react-hook-form";

// フォームの型定義
export interface RecruitPersonType {
  requiredApply: string;
  welcomeApply: string;
  seekPerson: string;
  notSolved: string;
}

const Application = (props: any) => {

  // default formを設定
  const { control, handleSubmit, setValue, formState:{errors}} =
    useForm<RecruitPersonType>({
      defaultValues: {
        requiredApply: "",
        welcomeApply: "",
        seekPerson: "",
      },
      mode: "all",
    });

  const onSubmit = (data: RecruitPersonType) => {
    console.log(data);
    props.handleNext();
    props.setFormValue({ ...props.formValue, RecruitPersonForm: data });
  };

  // propsで値を設定
  useEffect(() => {
    if (props.formValue.RecruitPersonForm) {
      setValue("requiredApply", props.formValue.RecruitPersonForm.requiredApply, {
        shouldDirty: true,
      });
      setValue("welcomeApply", props.formValue.RecruitPersonForm.welcomeApply, {
        shouldDirty: true,
      });
      setValue("seekPerson", props.formValue.RecruitPersonForm.seekPerson, {
        shouldDirty: true,
      });
    }
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        求める人物像
      </Typography>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <Typography>
          応募にあたっての必須条件を入力してください
        </Typography>

        <Box mb={3}>
          <Controller
            name="requiredApply"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                placeholder="必須条件"
                error={errors.requiredApply ? true : false}
                helperText={errors.requiredApply?.message}
                fullWidth
                multiline
                rows={6}
                margin="normal"
              ></TextField>
            )}
          />
        </Box>

        <Typography>
          応募にあたっての歓迎条件を入力してください
        </Typography>

        <Box mb={3}>
          <Controller
            name="welcomeApply"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                placeholder="歓迎条件"
                error={errors.welcomeApply ? true : false}
                helperText={errors.welcomeApply?.message}
                fullWidth
                multiline
                rows={6}
                margin="normal"
              ></TextField>
            )}
          />
        </Box>

        <Typography gutterBottom >
          こんな人と働きたい
        </Typography>

        <Box mb={3}>
          <Controller
            name="seekPerson"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                placeholder="こんな方と働きたい"
                error={errors.seekPerson ? true : false}
                helperText={errors.seekPerson?.message}
                fullWidth
                multiline
                rows={6}
                margin="normal"
              ></TextField>
            )}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: 'flex-end', pt: 2 }}>
          <Button variant="outlined" onClick={props.handleBack} sx={{ mr: 1 }}>
            戻る
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            次へ
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Application;
