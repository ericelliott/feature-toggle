declare module 'feature-toggle' {
  namespace featureToggle {
    interface FeatureToggle {
     active: (featureName: string) => boolean;
     activate: (featureName: string) => FeatureToggle;
     deactivate: (featureName: string) => FeatureToggle;
   }
 }
  function featureToggle(features: string[]): featureToggle.FeatureToggle;
  export = featureToggle;
}
