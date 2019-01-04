declare module 'feature-toggle' {
  namespace featureToggle {
    interface FeatureToggle {
     active: (featureName: string) => boolean;
     activate: (features: string[]) => FeatureToggle;
     deactivate: (features: string[]) => FeatureToggle;
   }
 }
  function featureToggle(features: string[]): featureToggle.FeatureToggle;
  export = featureToggle;
}
