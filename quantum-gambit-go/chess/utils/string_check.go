package utils

func IsUpper(s string) bool {
	for _, charNumber := range s {
		if charNumber > 90 || charNumber < 65 {
			return false
		}
	}
	return true
}

func IsLower(s string) bool {
	for _, charNumber := range s {
		if charNumber > 122 || charNumber < 97 {
			return false
		}
	}
	return true
}
